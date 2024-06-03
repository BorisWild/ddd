import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export default (dir_path, file_size) => {
    const root_dir = process.env.HOME + "/" + dir_path;
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            if (file.fieldname == "image") {
                cb(null, root_dir + "/images");
            } else if (file.fieldname == "file") {
                cb(null, root_dir + "/files");
            } else if (file.fieldname == "video") {
                cb(null, root_dir + "/videos");
            } else if (file.fieldname == "ar_file") {
                cb(null, root_dir + "/ar_files");
            } else {
                cb(new Error("File extention is depricated"), false);
            }
            
        },
        
        filename: function(req, file, cb) {
            let name = file.originalname.split(".");

            cb(null, uuidv4() + '.' + name[name.length - 1]);
        }
    });
    
    const file_filter = (req, file, cb) => {
        if (file.fieldname == "image") {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cb(null, true);
            } else {
                cb(new Error("File should have png/jpeg extentions"), false);
            }
        } else if (file.fieldname == "file") {
            if (file.mimetype === "application/octet-stream") {
                cb(null, true);
            } else {
                cb(new Error("File should be binary"), false);
            }
        } else if (file.fieldname == "video") {
            if (file.mimetype === "video/mp4") {
                cb(null, true);
            } else {
                cb(new Error("File should have .mp4 extention"), false);
            }
        } else if (file.fieldname == "ar_file") {
            if (file.mimetype === "application/octet-stream") {
                cb(null, true);
            } else {
                cb(new Error("File should be binary"), false);
            }
        } else {
            cb(new Error("File extention is depricated"), false);
        }
    }
    
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: file_size
        },
        fileFilter: file_filter
    });

    return upload;
}