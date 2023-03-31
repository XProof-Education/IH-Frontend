import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/react';
import { Filesystem, Directory } from '@capacitor/filesystem';

// Returns all photos stored
export default async function loadPhotos() {
    const PHOTO_STORAGE = 'photos';
    const { value } = await Preferences.get({ key: PHOTO_STORAGE });
    
    const photosInPreferences = value ? JSON.parse(value) : [];           
    // If running on the web...
    if (!isPlatform('hybrid')) {
        for (let photo of photosInPreferences) {
            const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
            });
            // Web platform only: Load the photo as base64 data
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
    }
    return photosInPreferences;
}; 