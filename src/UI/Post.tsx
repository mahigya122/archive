import React, {useState} from "react";
import { data } from "react-router-dom";
import type { postItem } from "../types";

export default function Post() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    const [posts, setPosts] = useState<postItem[]>([]);

    const handleposts = () => {
        if (text1.trim() === '' || text2.trim() === '') {
            const newPost: postItem = {
                text1: text1,
                text2: text2,
                data: Date.now(),  
            };
            setPosts([...posts, newPost]);
            setText1('');
            setText2('');
        }
    };

    return(
        <div className="p-8 max-w space-y-6 ">
            <h2 className="text-2xl font-bold">Create a Post</h2>
            <input 
                type="text"
                placeholder="Title"
                className="w-full rounded bg-white px-3 py-2 text-black placeholder:text-gray-500"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
            />
            <textarea
                placeholder="Content"
                className="w-full rounded bg-white px-3 py-2 text-black placeholder:text-gray-500"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
            />
            <button 
                onClick={handleposts}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Post
            </button>
            <div className="space-y-4">
                {posts.map((post, index) => (
                    <div key={index} className="border p-4 rounded bg-gray-100">
                        <h3 className="text-xl font-semibold">{post.text1}</h3>
                        <p>{post.text2}</p>
                        <span className="text-sm text-gray-500">{new Date(post.data).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}