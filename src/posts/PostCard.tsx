import {useState} from "react";
import {useArchive} from "../context/postContext";

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
        <div className="w-full bg-surface-soft border border-border rounded-xl p-4 shadow-sm max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                    <input 
                        type="text"
                        placeholder="Post title"
                        className="flex-[0.4] bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <textarea
                        placeholder="Post body"
                        rows={1}
                        className="flex-1 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none min-h-10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button 
                    onClick={handlePosts}
                    className="sm:w-32 bg-primary hover:bg-primary-strong text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-md shadow-primary/20 transition-all active:scale-95 shrink-0"
                >
                    Add post
                </button>
            </div>
        </div>
    )
    }