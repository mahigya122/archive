import { ArchiveProvider } from "./context/archiveContext";
import Header from "./UI/Header";
import {faker} from "@faker-js/faker";
import { useState } from "react";
import Post from "./UI/Post";

interface postItem {
  id: string;
  text1: string;
  text2: string;
}

function createRandomPost() {
  return {
    id: faker.string.uuid(),
    text1: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    text2: faker.hacker.phrase(),
  };
}

const generatePosts = faker.helpers.multiple(createRandomPost, { count: 100 });

  function App() {
    const [posts, setPosts] = useState<postItem[]>(generatePosts);
    const [searchquery, setSearchQuery] = useState('');

    return (
      <div>
        <Header />
        <main>
          <Post />
         <section style = {{ padding: '2rem' }}>
          <h1 className="bold-text">Post Archive</h1>
          {posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h2>{post.text1}</h2>
              <p>{post.text2}</p>
            </div>
          ))}
         </section>
        </main>
      </div>
    );
}
  
export default App;