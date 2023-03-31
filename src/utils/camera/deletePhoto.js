import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

// Input: photo to delete
// Output: updated array of photos
export default async function deletePhoto(photo) {
    const PHOTO_STORAGE = 'photos';
    
    // Update photos array cache by overwriting the existing photo array
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify([]) });
    
    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
    });
};