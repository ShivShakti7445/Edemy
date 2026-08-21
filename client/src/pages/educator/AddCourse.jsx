import React, { useEffect, useContext, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios'
import { AppContext } from '../../context/AppContext';

const AddCourse = () => {

  const { backendUrl, getToken } = useContext(AppContext)

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? 
          { ...chapter, collapsed: !chapter.collapsed } : 
          chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      toast.error('Please fill all lecture fields');
      return;
    }
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        toast.error('Thumbnail Not Selected')
        return;
      }
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      }

      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', image)
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/educator/add-course', formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ""
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className='min-h-screen bg-slate-50/50 p-5 md:p-8 w-full max-w-4xl space-y-6'>
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Create New Course</h1>
        <p className="text-slate-500 text-xs mt-0.5">Fill in the course details, upload a thumbnail, and build your curriculum chapters.</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs'>
        
        {/* Title */}
        <div className='space-y-1.5'>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">Course Title</label>
          <input 
            onChange={e => setCourseTitle(e.target.value)} 
            value={courseTitle} 
            type="text" 
            placeholder='e.g. Master Full-Stack Web Development' 
            className='w-full outline-none py-2.5 px-3.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-800 text-xs font-medium transition-all' 
            required 
          />
        </div>

        {/* Description */}
        <div className='space-y-1.5'>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">Course Description</label>
          <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
            <div ref={editorRef} className="min-h-28"></div>
          </div>
        </div>
        
        {/* Pricing & Thumbnail Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-1'>
          <div className='space-y-1.5'>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">Price ($)</label>
            <input 
              onChange={e => setCoursePrice(e.target.value)} 
              value={coursePrice} 
              type="number" 
              placeholder='99' 
              className='w-full outline-none py-2.5 px-3.5 rounded-lg border border-slate-200 focus:border-blue-500 text-slate-800 text-xs font-semibold transition-all' 
              required 
            />
          </div>

          <div className='space-y-1.5'>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">Discount (%)</label>
            <input 
              onChange={e => setDiscount(e.target.value)} 
              value={discount} 
              type="number" 
              placeholder='0' 
              min={0} 
              max={100} 
              className='w-full outline-none py-2.5 px-3.5 rounded-lg border border-slate-200 focus:border-blue-500 text-slate-800 text-xs font-semibold transition-all' 
              required 
            />
          </div>

          <div className='space-y-1.5'>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">Thumbnail Image</label>
            <label htmlFor='thumbnailImage' className='flex items-center justify-between border border-dashed border-slate-300 hover:border-blue-400 p-2.5 rounded-lg cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all'>
              <div className="flex items-center gap-2">
                <span className="text-base">🖼️</span>
                <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[110px]">
                  {image ? image.name : 'Upload Thumbnail'}
                </span>
              </div>
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept="image/*" hidden />
              {image && <img className='h-7 w-10 object-cover rounded border border-slate-200' src={URL.createObjectURL(image)} alt="Preview" />}
            </label>
          </div>
        </div>

        {/* Curriculum & Chapters Builder */}
        <div className="space-y-3 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Curriculum & Chapters</h3>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {chapters.length} Chapters Created
            </span>
          </div>

          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-slate-50/80 border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="flex justify-between items-center px-3.5 py-2.5 bg-white border-b border-slate-200">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleChapter('toggle', chapter.chapterId)}>
                  <span className={`text-slate-400 text-xs transition-transform ${chapter.collapsed && "-rotate-90"}`}>▼</span>
                  <span className="font-semibold text-slate-800 text-xs">{chapterIndex + 1}. {chapter.chapterTitle}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{chapter.chapterContent.length} Lectures</span>
                  <button type="button" onClick={() => handleChapter('remove', chapter.chapterId)} className='text-slate-400 hover:text-red-500 text-xs p-0.5'>✕</button>
                </div>
              </div>

              {!chapter.collapsed && (
                <div className="p-3 space-y-2">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">{lectureIndex + 1}. {lecture.lectureTitle}</span>
                        <span className="text-slate-400 text-[11px]">• {lecture.lectureDuration} mins</span>
                        {lecture.isPreviewFree && <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold text-[10px]">Free Preview</span>}
                      </div>
                      <button type="button" onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} className='text-slate-400 hover:text-red-500 text-xs'>✕</button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => handleLecture('add', chapter.chapterId)} 
                    className="w-full py-1.5 rounded-lg border border-dashed border-blue-300 text-blue-600 bg-blue-50/50 hover:bg-blue-100/50 text-[11px] font-semibold transition-colors"
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          <button 
            type="button" 
            onClick={() => handleChapter('add')} 
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50/30 font-semibold text-xs transition-all"
          >
            + Add Chapter
          </button>

          {/* Lecture Modal Popup */}
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
              <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-xl border border-slate-200 space-y-3 relative">
                <button type="button" onClick={() => setShowPopup(false)} className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-sm'>✕</button>

                <h3 className="text-base font-bold text-slate-800">Add New Lecture</h3>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Lecture Title</label>
                    <input
                      type="text"
                      className="w-full outline-none border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:border-blue-500"
                      value={lectureDetails.lectureTitle}
                      onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                      placeholder="e.g. Introduction to React"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      className="w-full outline-none border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:border-blue-500"
                      value={lectureDetails.lectureDuration}
                      onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Lecture Video URL</label>
                    <input
                      type="text"
                      className="w-full outline-none border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:border-blue-500"
                      value={lectureDetails.lectureUrl}
                      onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="checkbox" 
                      id="previewCheck"
                      className='w-3.5 h-3.5 rounded text-blue-600 border-slate-300'
                      checked={lectureDetails.isPreviewFree}
                      onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                    />
                    <label htmlFor="previewCheck" className="font-medium text-slate-700 cursor-pointer text-[11px]">Allow Free Preview?</label>
                  </div>
                </div>

                <button 
                  onClick={addLecture} 
                  type='button' 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-full shadow-xs transition-all text-xs cursor-pointer"
                >
                  Save Lecture
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Form Button */}
        <div className="pt-3 border-t border-slate-200">
          <button 
            type="submit" 
            className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer'
          >
            🚀 Publish Course
          </button>
        </div>

      </form>
    </div>
  )

}

export default AddCourse