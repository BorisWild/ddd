    import fs from "fs";

    function delete_file(file_path, default_path) {
        try {
            if (file_path != default_path) {
                fs.stat(file_path, function(err, stat) {
                    if (err == null) {
                        fs.unlinkSync(file_path);
                    } else if (err.code === "ENOENT") {
                        console.log("File dosen\'t exist");
                    } else {
                        console.log("Some other error: ", err.code);
                        throw new Error({ message: "Some other error: " + err.code});
                    }
                });
            }

            return 0; 
        } catch (e) {
            return console.log(e);
        }
    }

    export {
        delete_file
    }