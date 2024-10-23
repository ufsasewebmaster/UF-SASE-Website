import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import Quill CSS

import { createFileRoute } from '@tanstack/react-router'
import parse from 'html-react-parser'
import { FiSave, FiUpload, FiX } from 'react-icons/fi'
import { Button } from '../components/ui/button'
import '../blog.css'

export const Route = createFileRoute('/blog')({
  component: () => {
    const [editorContent, setEditorContent] = useState<string>(
      'This is the initial blog content. Click edit to change the text.',
    )
    const [isEditing, setIsEditing] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [imageUploaded, setImageUploaded] = useState(false)
    const quillRef = useRef(null)

    const handleEdit = () => {
      setIsEditing(true)
    }

    const handleSave = () => {
      setIsEditing(false)
    }

    const handleImageSave = () => {
      setImageUploaded(false)
    }

    const handleChange = (content: string) => {
      setEditorContent(content)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const imageURL = URL.createObjectURL(file)
        setImageUrl(imageURL)
        setImageUploaded(true)
      }
    }

    const handleImageRemove = () => {
      setImageUrl(null)
      setImageUploaded(false)
    }

    return (
      <div className="blog-container">
        <div
          className="relative flex h-80 w-full items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : "url('default-image-url')",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload-banner"
          />

          {imageUrl && (
            <button
              className="absolute left-4 top-4 rounded border border-black bg-white px-2 py-1 text-black"
              onClick={handleImageRemove}
            >
              <FiX className="text-black" />
            </button>
          )}

          {!imageUploaded ? (
            <label
              htmlFor="upload-banner"
              className="absolute right-4 top-4 cursor-pointer rounded border border-black bg-white px-2 py-1 text-black"
            >
              <FiUpload className="text-black" />
            </label>
          ) : (
            <button
              className="absolute right-4 top-4 rounded border border-black bg-white px-2 py-1 text-black"
              onClick={handleImageSave}
            >
              <FiSave className="text-black" />
            </button>
          )}

          <h1 className="absolute text-5xl font-bold text-white [text-shadow:_0px_0px_4px_rgb(0_0_0_/_80%)]">
            September 2023 Recap
          </h1>
        </div>

        <div className="blog-content-container mx-auto max-w-5xl bg-white p-8">
          <div className="author-info text-black-600 mb-4 text-center">
            <p className="font-semibold">Gurleen Dhillon</p>
            <p className="text-sm">15 min read • Oct 5, 2023</p>
          </div>
          <hr className="my-4" />

          <div className="ql-editor prose lg:prose-xl mb-8">
            {!isEditing ? (
              <div>{parse(editorContent)}</div>
            ) : (
              <ReactQuill
                ref={quillRef}
                value={editorContent}
                onChange={handleChange}
                className="font-sans"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    [{ align: [] }],
                    ['clean'],
                  ],
                }}
              />
            )}
          </div>

          {!isEditing ? (
            <Button variant="default" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <Button variant="default" onClick={handleSave} className="mt-4">
              Save
            </Button>
          )}
        </div>
      </div>
    )
  },
})
