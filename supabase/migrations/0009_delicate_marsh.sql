/*
  # Workflow System Migration

  1. New Tables
    - `workflows`: Stores workflow definitions and configurations
    - `workflow_executions`: Tracks workflow execution history
    - `workflow_logs`: Detailed logs for debugging and monitoring

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their workflows" ON workflows;
DROP POLICY IF EXISTS "Users can view their workflow executions" ON workflow_executions;
DROP POLICY IF EXISTS "Users can view their workflow logs" ON workflow_logs;

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_workflows_user;
DROP INDEX IF EXISTS idx_workflow_executions_workflow;
DROP INDEX IF EXISTS idx_workflow_logs_execution;

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

CREATE POLICY "Users can view their workflow logs"
  ON workflow_logs
  FOR ALL
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

-- Create new indexes with IF NOT EXISTS
CREATE INDEX IF NOT EXISTS idx_workflows_user_new ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_workflow_new ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_logs_execution_new ON workflow_logs(execution_id);