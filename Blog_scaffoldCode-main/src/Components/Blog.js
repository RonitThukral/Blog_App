//Blogging App using Hooks
import React , {useEffect, useRef, useState} from 'react';
import {db} from "../firebaseInit"
import { setDoc, collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';

// function blogReducer (state, action) {
//     switch (action.type) {
//         case "Add":
//             return [action.blogs, ...state]
//         case "Remove":
//             return state.filter((blog, index) => index !== action.index)
//         default:
//             return [];
//     }
// }

export default function Blog(){
    
    // const [title , setTitle] = useState("");
    // const [content , setContent] = useState("");
    const [formData , setFormData] = useState({title: "" , content: ""})
    const [blogs , setBlogs] = useState([]);
    // const [blogs, dispatch] = useReducer(blogReducer , [])
    const titleRef = useRef(null)

    useEffect(() => {
        titleRef.current.focus()
    },[])

    useEffect(() => {
        // async function fetchData () {
        //     const snapShot = await getDocs(collection(db, "blogs"))

        //     const blogs = snapShot.docs.map((doc) => {
        //         return {
        //             id: doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     //list all the blogs in the database in the console
        //     //console.log(blogs)
        //     setBlogs(blogs)
        // }
        // fetchData()
// to get real time updates
const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
    try {
        const blogsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setBlogs(blogsData);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
});

return () => unsubscribe();

    },[])

   

    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();

        const docRef = doc(collection(db, "blogs"))
        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        })

        // setBlogs([{title : formData.title, content: formData.content}, ...blogs])

        // dispatch({type: "Add", blogs: {title : formData.title, content: formData.content}})
        
        setFormData({title: "", content: ""})
    }

    async function deleteBlog (id) {

        await deleteDoc(doc(db, "blogs", id))

        // setBlogs(blogs.filter((blog, index) => i !== index))

        // dispatch({type: "Remove", index: i})

    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.." required
                                ref={titleRef} value={formData.title} onChange={(e) => setFormData({title: e.target.value , content: formData.content})}/>
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.." value={formData.content} onChange={(e) => setFormData({title : formData.title , content: e.target.value})}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog , i) => {
            return <div className='blog' key={i}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <div className='blog-btn'>
                <button className='btn remove' onClick={() => deleteBlog(blog.id)}>Delete</button>
            </div>
            </div>

        })}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
