import Header from "./component/Header";
import PostArchive from "./posts/PostArchive";
import Post from "./posts/PostCard";
import PostList from "./posts/PostList";

function App(){
return (
    <div className="min-h-screen bg-bg-main font-sans selection:bg-primary/20">
      <Header />
        <main className="space-y-12 py-10 px-6">
          <Post />
          
          <div className="max-w-[1400px] mx-auto">
            <PostList />
          </div>

          <PostArchive />
        </main>
        
        <footer className="max-w-[1400px] mx-auto px-6 py-12 border-t border-border mt-20">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
            <span>&copy; by The Atomic Archive</span>
            <span className="text-primary">✌️</span>
          </p>
        </footer>
    </div>
    );
}
  
export default App;