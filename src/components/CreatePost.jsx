import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const CreatePost = ({isAuth}) => {
  const [title, setTitle] = useState()
  const [postText, setPostText] = useState()

  const navigate = useNavigate()

  const createPost = async () => {
    await addDoc(collection(db, 'posts'), {
      title: title,
      postText: postText,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    })
    navigate('/')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h1 className="mb-4 text-2xl font-bold">記事を投稿する</h1>
          <div className="mb-2">
            <div>タイトル</div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-400 rounded-sm w-96"
              type="text"
              placeholder="タイトルを記入"
            />
          </div>
          <div className="mb-4">
            <div>投稿</div>
            <textarea
              onChange={(e) => setPostText(e.target.value)}
              className="border border-gray-400 rounded-sm w-96"
              placeholder="投稿内容を記入"
            ></textarea>
          </div>
          <button
            onClick={createPost}
            className="w-full border border-gray-400 rounded-sm text-white bg-blue-600 py-1"
          >
            投稿する
          </button>
        </div>
      </div>
    </>
  )
}

export default CreatePost
