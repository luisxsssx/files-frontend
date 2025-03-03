const URL_BASE = 'http://localhost:8080/home';

export const endpoints = {
    content: {
        getContent: `${URL_BASE}/folder?path=`,
        getFolderContent: (path: string) => `${URL_BASE}/folder?path=${encodeURIComponent(path)}`,
        getFiles: (path: string) => `${URL_BASE}/folder?path=${encodeURIComponent(path)}&type=file`,
        getFolders: (path: string) => `${URL_BASE}/folder?path=${encodeURIComponent(path)}&type=folder`,
        getPaperBin: `${URL_BASE}/paper-bin?path=`,
        getAllContent: (type: string) => `${URL_BASE}/all-content?type=${encodeURIComponent(type)}`
    },
    add: {
        postFiles: `${URL_BASE}/upload`,
        createFolder: `${URL_BASE}/folder/create`
    },
    delete: {
        deleteItem: (path: string) => `${URL_BASE}/delete?path=${encodeURIComponent(path)}`
    }
}