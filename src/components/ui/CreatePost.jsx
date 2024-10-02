import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";
import { useRecoilValue } from 'recoil';
import { formDataAtom } from '@/formDataAtom';
import html2canvas from 'html2canvas';

const CreatePost = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const formData = useRecoilValue(formDataAtom);
  
  const postRef = useRef();
  const downloadButtonRef = useRef();

  const handleDownloadImage = () => {
    if (postRef.current) { 
      // Temporarily hide the download button
      if (downloadButtonRef.current) {
        downloadButtonRef.current.style.display = 'none';
      }

      html2canvas(postRef.current)
        .then(canvas => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png'); 
          link.download = 'post-image.png'; 
          link.click();
        })
        .catch(error => {
          console.error('Error generating image:', error);
        })
        .finally(() => {
          if (downloadButtonRef.current) {
            downloadButtonRef.current.style.display = 'block';
          }
        });
    } else {
      console.error('postRef is null or undefined');
    }
  };

  useEffect(() => {
    let profilePicUrl, postPicUrl;

    if (formData.profilePic) {
      profilePicUrl = URL.createObjectURL(formData.profilePic);
    }
    if (formData.postPic) {
      postPicUrl = URL.createObjectURL(formData.postPic);
    }

    return () => {
      if (profilePicUrl) URL.revokeObjectURL(profilePicUrl);
      if (postPicUrl) URL.revokeObjectURL(postPicUrl);
    };
  }, [formData.profilePic, formData.postPic]);

  return (
    <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-sm" ref={postRef}>
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            {formData.profilePic ? (
              <AvatarImage src={URL.createObjectURL(formData.profilePic)} alt="User" />
            ) : (
              <AvatarFallback>UN</AvatarFallback>
            )}
          </Avatar>
          <span className="font-semibold text-sm">{formData.username}</span>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      {formData.postPic && (
        <img className="w-full" src={URL.createObjectURL(formData.postPic)} alt="Post content" />
      )}
      
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSaved(!isSaved)}>
            <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm">{`${formData.numberOfLikes} likes`}</span>
      </div>
      
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm mr-2">{formData.username}</span>
        <span className="text-sm">{formData.caption}</span>
      </div>
      
      <div className="px-3 pb-2 text-sm text-gray-500">
        View all {formData.numberOfComments} comments
      </div>
      
      <div className="px-3 pb-3 text-xs text-gray-500 uppercase">
        {formData.timeStamp} hours ago
      </div>
      
      <div className="flex items-center border-t border-gray-200 px-3 py-2">
        <Input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow text-sm border-none shadow-none focus-visible:ring-0"
        />
        <Button variant="ghost" className="text-blue-500 font-semibold">
          Post
        </Button>
      </div>

      <div className="flex justify-center" ref={downloadButtonRef}>
        <Button variant="solid" className="mt-4" onClick={handleDownloadImage}>
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
