import Header from "./component/Header";
import PostArchive from "./posts/PostArchive";
import Post from "./posts/PostCard";
import PostList from "./posts/PostList";

function App(){
return (
    <div>
      <Header />
        <main className="space-y-8 p-6">
          <Post />
          <PostList />
          <PostArchive />
        </main>
    </div>
    );
}
  
export default App;