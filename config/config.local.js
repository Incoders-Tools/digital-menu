export const storeConfig = {
    // General site configuration
    site: {
        name: "#TabName",
        description: "#TabDescription",
        shortName: "#ShortName",
        subtitle: "#SloganOrSubtitle",
        copyright: "2025 Incoders - Software Techonolgies. All rights reserved.",
        title: "#MenuTitle",
        url: "http://127.0.0.1:8080",
        previewImage: "imgs/bergbach-fragrance-preliminar.jpg",
        loader: {
            general: {
                animationUrl: './assets/animations/general_loader_animation.json',
                loadingText: ""
            },
            drinks: {
                animationUrl: './assets/animations/general_loader_animation.json',
                loadingText: "Explorando Bebidas..."
            },
            desserts: {
                animationUrl: './assets/animations/general_loader_animation.json',
                loadingText: "Explorando Postres..."
            }
        },
        header: {
            appearance: "navbar"
        }
    },
    
    search: {
        placeholder: "Buscar platos..."
    },
    
    // Footer configuration
    footer: {
        title: "#ShortName - #Slogan",
        description: "#Footer subtitle or description",
        socialLinks: [
            { platform: "facebook", url: "#" },
            { platform: "instagram", url: "#" },
            { platform: "whatsapp", url: "#" }
        ]
    }
};

export const apiConfig = {
    google: {
        SheetsUrl: "https://script.google.com/macros/s/AKfycbz8bKKFWehv7cnLIjAHF4zsfAOcxUsi54x6HilPFevpCofdCBUSyXe6nYSUcMFIXXeCYQ/exec"
    }
};