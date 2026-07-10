import { Upload } from "lucide-react";

export default function UploadsPage() {
  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-900 mb-6">Uploads</h1>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center">
        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-600">Upload a file to generate a transcript</p>
        <p className="text-xs text-gray-400 mb-4">Browse or drag and drop MP3, M4A, WAV, MP4 or WEBM files</p>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md">Browse Files</button>
        <p className="text-xs text-gray-400 mt-6">Real audio transcription is out of scope for this demo.<br/>Use the New Meeting form to paste a transcript instead.</p>
      </div>
    </div>
  );
}