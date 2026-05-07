import {useState} from "react";
import {useArchive} from "../context/archiveContext";

export default function PostCard() {
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");

    const { addPost } = useArchive();

    const handlePosts = () => {
        if (!text.trim() || !description.trim()) return;
           addPost(text, description);
           setText("");
           setDescription("");
    };

    return(
        <div className="p-8 max-w space-y-6 ">
            <h2 className="text-2xl font-bold">Create a Post</h2>
            <input 
                type="text"
                placeholder="Title"
                className="w-full rounded bg-white px-3 py-2 text-black placeholder:text-gray-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <textarea
                placeholder="Content"
                className="w-full rounded bg-white px-3 py-2 text-black placeholder:text-gray-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button 
                onClick={handlePosts}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Post
            </button>
        </div>
    )
}