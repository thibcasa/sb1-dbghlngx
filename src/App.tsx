import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './lib/core/AppProvider';
import { PageLayout } from './components/layout/PageLayout';
import { Loading } from './utils/lazyLoad';
import { routes } from './lib/core/routes';
import { MarketingAIChat } from './features/ai/marketing/components/MarketingAIChat';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <PageLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              {Object.values(routes).map(({ path, component: Component }) => (
                <Route 
                  key={path} 
                  path={path} 
                  element={<Component />} 
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </PageLayout>
        <MarketingAIChat />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;