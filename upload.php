<?php
if (isset($_FILES['profile-pic'])) {
  $target_dir = "uploads/";
  $target_file = $target_dir. basename($_FILES["profile-pic"]["name"]);
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  // Check if image file is a valid format
  if ($imageFileType!= "jpg" && $imageFileType!= "png" && $imageFileType!= "jpeg") {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    return;
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    return;
  }

  // Check file size
  if ($_FILES['profile-pic']['size'] > 500000) {
    echo "Sorry, your file is too large.";
    return;
  }

  // Upload file
  if (!move_uploaded_file($_FILES["profile-pic"]["tmp_name"], $target_file)) {
    echo "Sorry, there was an error uploading your file.";
    return;
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    return;
  }

  // Return new profile picture URL
  echo $target_file;
}