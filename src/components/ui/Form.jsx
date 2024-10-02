import { formDataAtom } from "@/formDataAtom";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Form = () => {
  const [formData, setFormData] = useRecoilState(formDataAtom);
  const [imagePreviews, setImagePreviews] = useState({
    profilePic: null,
    postPic: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newImagePreviews = { ...imagePreviews };

      if (event.target.name === "postPic") {
        newImagePreviews.postPic = URL.createObjectURL(files[0]);
        setFormData((prevData) => ({
          ...prevData,
          postPic: files[0],
        }));
      } else if (event.target.name === "profilePic") {
        newImagePreviews.profilePic = URL.createObjectURL(files[0]);
        setFormData((prevData) => ({
          ...prevData,
          profilePic: files[0],
        }));
      }

      setImagePreviews(newImagePreviews);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted", formData);
  };

  useEffect(() => {
    return () => {
      if (imagePreviews.profilePic) {
        URL.revokeObjectURL(imagePreviews.profilePic);
      }
      if (imagePreviews.postPic) {
        URL.revokeObjectURL(imagePreviews.postPic);
      }
    };
  }, [imagePreviews]);

  return (
    <Card className="p-4 shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          name="username"
          id="username"
          value={formData.username || ""}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Label htmlFor="caption">Caption:</Label>
        <Input
          type="text"
          name="caption"
          id="caption"
          value={formData.caption || ""}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Label htmlFor="postImage">Upload Post Image:</Label>
        <Input
          type="file"
          accept="image/*"
          name="postPic"
          id="postImage"
          onChange={handleImageChange}
          className="md-4"
          required
        />
        {/* {imagePreviews.postPic && (
          <img
            src={imagePreviews.postPic}
            alt="Post Preview"
            className="w-full h-auto mb-4"
          />
        )} */}
        <Label htmlFor="profilePic">Upload Profile Picture:</Label>
        <Input
          type="file"
          accept="image/*"
          name="profilePic"
          id="profilePic"
          onChange={handleImageChange}
          className="md-4"
          required
        />
        {/* {imagePreviews.profilePic && (
          <img
            src={imagePreviews.profilePic}
            alt="Profile Preview"
            className="w-full h-auto mb-4"
          />
        )} */}
        <Label htmlFor="numberOfLikes">Number of likes: </Label>
        <Input
          type="number"
          name="numberOfLikes"
          id="numberOfLikes"
          value={formData.numberOfLikes || ""}
          onChange={handleInputChange}
          className='mb-4'
          required
        />
        <Label htmlFor="numberOfComments">Number of Comments: </Label>
        <Input
          type="number"
          name="numberOfComments"
          id="numberOfComments"
          value={formData.numberOfComments || ""}
          onChange={handleInputChange}
          className='mb-4'
          required
        />
        <Label htmlFor="timeStamp">Time Stamp: </Label>
        <Input
          type="number"
          name="timeStamp"
          id="timeStamp"
          value={formData.timeStamp || ""}
          onChange={handleInputChange}
          className='mb-4'
          required
        />
        <Button type="submit" variant="primary" className="w-full">
          Submit
        </Button>{" "}
      </form>
    </Card>
  );
};

export default Form;
