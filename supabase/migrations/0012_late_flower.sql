/*
  # Enable RLS for user_campaigns table

  1. Security
    - Enable RLS on user_campaigns table
    - Add policy for authenticated users to manage their campaign relationships
  
  2. Changes
    - Enable row level security on user_campaigns table
    - Add policy for CRUD operations
*/

-- Enable RLS
ALTER TABLE user_campaigns ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can manage their campaign relationships"
  ON user_campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_user_campaigns_user ON user_campaigns(user_id);