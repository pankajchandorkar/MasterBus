<?php 
$uploadDir = 'uploads/'; 
$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 



 
// If form is submitted 
if(isset($_FILES['busPicture2']) && $_FILES["busPicture2"]["name"]!=""){ 
    // Get the submitted form data 
  
    $uploadStatus = 1; 
        
    // Upload file 
    $uploadedFile = ''; 
    if(!empty($_FILES["busPicture2"]["name"])){ 
            
        // File path config 
        $fileName = basename($_FILES["busPicture2"]["name"]); 
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            
        // Allow certain file formats 
        $allowTypes = array('jpg'); 
        if(in_array($fileType, $allowTypes)){ 
            // Upload file to the server 
            if(move_uploaded_file($_FILES["busPicture2"]["tmp_name"], $targetFilePath)){ 
                $uploadedFile = $fileName; 
            }else{ 
                $uploadStatus = 0; 
                $response['message'] = 'Sorry, there was an error uploading your file.'; 
                $response['filename'] = $fileName;
            } 
        }else{ 
            $uploadStatus = 0; 
            $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.'; 
            $response['filename'] = $fileName;
        } 
    } 
        
    if($uploadStatus == 1){ 
        $response['status'] = 1; 
        $response['message'] = 'Form data submitted successfully!'; 
        $response['imgPath'] = $targetFilePath; 
    } 
  
} 




// If form is submitted 
if(isset($_FILES['busPicture3']) && $_FILES["busPicture3"]["name"]!=""){ 
    // Get the submitted form data 
  
    $uploadStatus = 1; 
        
    // Upload file 
    $uploadedFile = ''; 
    if(!empty($_FILES["busPicture3"]["name"])){ 
            
        // File path config 
        $fileName = basename($_FILES["busPicture3"]["name"]); 
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            
        // Allow certain file formats 
        $allowTypes = array('jpg'); 
        if(in_array($fileType, $allowTypes)){ 
            // Upload file to the server 
            if(move_uploaded_file($_FILES["busPicture3"]["tmp_name"], $targetFilePath)){ 
                $uploadedFile = $fileName; 
            }else{ 
                $uploadStatus = 0; 
                $response['message'] = 'Sorry, there was an error uploading your file.'; 
                $response['filename'] = $fileName;
            } 
        }else{ 
            $uploadStatus = 0; 
            $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.'; 
            $response['filename'] = $fileName;
        } 
    } 
        
    if($uploadStatus == 1){ 
        $response['status'] = 1; 
        $response['message'] = 'Form data submitted successfully!'; 
        $response['imgPath'] = $targetFilePath; 
    } 
  
} 





// If form is submitted 
if(isset($_FILES['busPicture4']) && $_FILES["busPicture4"]["name"]!=""){ 
    // Get the submitted form data 
  
    $uploadStatus = 1; 
        
    // Upload file 
    $uploadedFile = ''; 
    if(!empty($_FILES["busPicture4"]["name"])){ 
            
        // File path config 
        $fileName = basename($_FILES["busPicture4"]["name"]); 
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            
        // Allow certain file formats 
        $allowTypes = array('jpg'); 
        if(in_array($fileType, $allowTypes)){ 
            // Upload file to the server 
            if(move_uploaded_file($_FILES["busPicture4"]["tmp_name"], $targetFilePath)){ 
                $uploadedFile = $fileName; 
            }else{ 
                $uploadStatus = 0; 
                $response['message'] = 'Sorry, there was an error uploading your file.'; 
                $response['filename'] = $fileName;
            } 
        }else{ 
            $uploadStatus = 0; 
            $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.'; 
            $response['filename'] = $fileName;
        } 
    } 
        
    if($uploadStatus == 1){ 
        $response['status'] = 1; 
        $response['message'] = 'Form data submitted successfully!'; 
        $response['imgPath'] = $targetFilePath; 
    } 
  
} 





// If form is submitted 
if(isset($_FILES['busPicture5']) && $_FILES["busPicture5"]["name"]!=""){ 
    // Get the submitted form data 
  
    $uploadStatus = 1; 
        
    // Upload file 
    $uploadedFile = ''; 
    if(!empty($_FILES["busPicture5"]["name"])){ 
            
        // File path config 
        $fileName = basename($_FILES["busPicture5"]["name"]); 
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            
        // Allow certain file formats 
        $allowTypes = array('jpg'); 
        if(in_array($fileType, $allowTypes)){ 
            // Upload file to the server 
            if(move_uploaded_file($_FILES["busPicture5"]["tmp_name"], $targetFilePath)){ 
                $uploadedFile = $fileName; 
            }else{ 
                $uploadStatus = 0; 
                $response['message'] = 'Sorry, there was an error uploading your file.'; 
                $response['filename'] = $fileName;
            } 
        }else{ 
            $uploadStatus = 0; 
            $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.'; 
            $response['filename'] = $fileName;
        } 
    } 
        
    if($uploadStatus == 1){ 
        $response['status'] = 1; 
        $response['message'] = 'Form data submitted successfully!'; 
        $response['imgPath'] = $targetFilePath; 
    } 
  
} 
 
// Return response 
echo json_encode($response);