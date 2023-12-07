import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'static'))
    },

    filename : function(req, file,cb){
        const uniqueSuffix = Date.now()+ '-' + Math.round(Math.random()* 1E9)
        cb(null,file.fieldname+'-'+ uniqueSuffix + '-' + ext)
    }
})

 const multerInstance = multer({storage})

 export default multerInstance