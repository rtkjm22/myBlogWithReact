import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export const Home = () => {
  const [postList, setPostList] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, 'posts'))
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [])

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id))
    const newPostList = [...postList].filter((item) => item.id !== id)
    setPostList(newPostList)
  }

  return (
    <div className="flex flex-col w-full h-auto items-center p-5">
      {postList.map(({ title, postText, id, author }) => (
        <div
          key={id}
          className="bg-white max-w-2xl rounded-lg p-5 min-w-[600px] mb-5"
        >
          <div className="mb-2 text-center">
            <h1 className="text-center1">{title}</h1>
          </div>
          <div className="mb-2">{postText}</div>
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-bold">
              @{author.username}
            </h3>

            {author.id === auth.currentUser?.uid && (
              <button
                onClick={() => handleDelete(id)}
                className="py-2 px-4 rounded text-white bg-red-300 text-sm cursor-pointer transition-all hover:opacity-80"
              >
                削除
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
