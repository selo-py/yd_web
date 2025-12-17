import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import VideoList from './pages/VideoList.jsx'
import VideoDetail from './pages/VideoDetail.jsx'
import YouTubeList from './pages/YouTubeList.jsx'
import YouTubeDetail from './pages/YouTubeDetail.jsx'
import Home from './pages/Home.jsx'
import Hakkimizda from './pages/Hakkimizda.jsx'
import Iletisim from './pages/Iletisim.jsx'
import Bulten from './pages/Bulten.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import FailureStories from './pages/FailureStories.jsx'
import FailureDetail from './pages/FailureDetail.jsx'
import NewsList from './pages/NewsList.jsx'
import NewsDetail from './pages/NewsDetail.jsx'
import FinansList from './pages/FinansList.jsx'
import FinansDetail from './pages/FinansDetail.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AddVideo from './pages/admin/AddVideo.jsx'
import AddYouTube from './pages/admin/AddYouTube.jsx'
import AddFailure from './pages/admin/AddFailure.jsx'
import AddNews from './pages/admin/AddNews.jsx'
import AddFinans from './pages/admin/AddFinans.jsx'
import ContentList from './pages/admin/ContentList.jsx'
import HomeContentManager from './pages/admin/HomeContentManager.jsx'
import EditVideo from './pages/admin/EditVideo.jsx'
import EditYouTube from './pages/admin/EditYouTube.jsx'
import EditFailure from './pages/admin/EditFailure.jsx'
import EditNews from './pages/admin/EditNews.jsx'
import EditFinans from './pages/admin/EditFinans.jsx'
import HomeContentView from './pages/admin/HomeContentView.jsx'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Admin Routes - No Navbar/Footer */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <div className="min-h-screen bg-white dark:bg-zinc-950">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="home-content" element={<HomeContentManager />} />
            <Route path="video/add" element={<AddVideo />} />
            <Route path="youtube/add" element={<AddYouTube />} />
            <Route path="failure/add" element={<AddFailure />} />
            <Route path="news/add" element={<AddNews />} />
            <Route path="finans/add" element={<AddFinans />} />
            <Route path=":type/list" element={<ContentList />} />
            <Route path="video/edit/:id" element={<EditVideo />} />
            <Route path="youtube/edit/:id" element={<EditYouTube />} />
            <Route path="failure/edit/:id" element={<EditFailure />} />
            <Route path="news/edit/:id" element={<EditNews />} />
            <Route path="finans/edit/:id" element={<EditFinans />} />
            <Route path="home-content-view" element={<HomeContentView />} />
          </Routes>
        </div>
      } />
      
      {/* Public Routes - With Navbar/Footer */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="hakkimizda" element={<Hakkimizda />} />
        <Route path="iletisim" element={<Iletisim />} />
        <Route path="bulten" element={<Bulten />} />
        <Route path="gizlilik-politikasi" element={<PrivacyPolicy />} />
        <Route path="video" element={<VideoList />} />
        <Route path="video/:slug" element={<VideoDetail />} />
        <Route path="youtube" element={<YouTubeList />} />
        <Route path="youtube/:slug" element={<YouTubeDetail />} />
        <Route path="basarisizlik-hikayeleri" element={<FailureStories />} />
        <Route path="basarisizlik-hikayeleri/:slug" element={<FailureDetail />} />
        <Route path="yeni-dunya-haber" element={<NewsList />} />
        <Route path="yeni-dunya-haber/:slug" element={<NewsDetail />} />
        <Route path="finans" element={<FinansList />} />
        <Route path="finans/:slug" element={<FinansDetail />} />
        <Route path="*" element={<Navigate to="/video" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
