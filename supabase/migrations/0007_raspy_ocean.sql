/*
  # Workflow System Tables

  1. New Tables
    - `workflows` - Stores workflow definitions
    - `workflow_executions` - Tracks workflow execution history
    - `workflow_templates` - Pre-defined workflow templates
    - `workflow_logs` - Detailed execution logs

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  description text,
  trigger jsonb NOT NULL,
  actions jsonb NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow executions table
CREATE TABLE IF NOT EXISTS workflow_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflows(id),
  status text NOT NULL CHECK (status IN ('running', 'completed', 'failed')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  error text,
  metadata jsonb DEFAULT '{}'
);

-- Workflow templates table
CREATE TABLE IF NOT EXISTS workflow_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  workflow jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Workflow logs table
CREATE TABLE IF NOT EXISTS workflow_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id uuid REFERENCES workflow_executions(id),
  type text NOT NULL CHECK (type IN ('info', 'warning', 'error')),
  message text NOT NULL,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their workflows"
  ON workflows
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their workflow executions"
  ON workflow_executions
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM workflows 
      WHERE id = workflow_executions.workflow_id
    )
  );

CREATE POLICY "Users can view workflow templates"
  ON workflow_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their workflow logs"
  ON workflow_logs
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM workflows 
      WHERE id = (
        SELECT workflow_id 
        FROM workflow_executions 
        WHERE id = workflow_logs.execution_id
      )
    )
  );

-- Indexes
CREATE INDEX idx_workflows_user ON workflows(user_id);
CREATE INDEX idx_workflow_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX idx_workflow_logs_execution ON workflow_logs(execution_id);
CREATE INDEX idx_workflow_templates_category ON workflow_templates(category);