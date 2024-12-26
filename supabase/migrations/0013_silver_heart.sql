/*
  # Fix RLS for user_campaigns table

  1. Changes
    - Enable RLS on user_campaigns table
    - Add policy for authenticated users
    - Add index for performance optimization

  2. Security
    - Enable RLS to protect user data
    - Add policy to ensure users can only access their own campaign relationships
*/

-- Enable RLS if not already enabled
ALTER TABLE user_campaigns ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can manage their campaign relationships" ON user_campaigns;

-- Create policy for authenticated users
CREATE POLICY "Users can manage their campaign relationships"
  ON user_campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for performance if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_user_campaigns_user ON user_campaigns(user_id);