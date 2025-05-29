package main

import (
	"log"
	"net/http"
	"os"
	"text/template"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // default for local dev
	}

	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./static/js"))))
	http.Handle("/style/", http.StripPrefix("/style/", http.FileServer(http.Dir("./static/style"))))
	http.Handle("/other/", http.StripPrefix("/other/", http.FileServer(http.Dir("./static/other"))))
	http.Handle("/pwa/", http.StripPrefix("/pwa/", http.FileServer(http.Dir("./static/pwa"))))
	http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("img"))))

	// Page routes
	http.HandleFunc("/", logRequest(router))

	log.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func router(w http.ResponseWriter, r *http.Request) {
	switch r.URL.Path {
	case "/service-worker.js":
		w.Header().Set("Content-Type", "application/javascript")
		http.ServeFile(w, r, "./static/service-worker.js")
	case "/about":
		serveHTML(w, r, "./static/about.html")
	case "/contact":
		serveHTML(w, r, "./static/contact.html")
	case "/photogallery":
		// serveHTML(w, r, "./static/photoGallery.html")

		imagesDir := "img/B&W_1/"
		files, err := os.ReadDir(imagesDir)
		if err != nil {
			http.Error(w, "Unable to read images", http.StatusInternalServerError)
			return
		}

		var images []string
		for _, file := range files {
			if !file.IsDir() {
				images = append(images, "/"+imagesDir+file.Name())
			}
		}

		tmpl := template.Must(template.ParseFiles("static/photoGallery.html"))
		err = tmpl.Execute(w, images)
		if err != nil {
			http.Error(w, "Template error", http.StatusInternalServerError)
		}

	case "/moviegallery":
		serveHTML(w, r, "./static/videoGallery.html")
	case "/":
		serveHTML(w, r, "./static/index.html")
	default:
		http.NotFound(w, r)
	}
}

func serveHTML(w http.ResponseWriter, r *http.Request, path string) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		http.NotFound(w, r)
		return
	}
	http.ServeFile(w, r, path)
}

func logRequest(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s\n", r.Method, r.URL.Path)
		next(w, r)
	}
}
