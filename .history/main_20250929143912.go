package main

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

type Profile struct {
	Name    string `json:"name"`
	Title   string `json:"title"`
	Company string `json:"company"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
}

type Contact struct {
	Name    string `json:"name"`
	Title   string `json:"title"`
	Company string `json:"company"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
}

var (
	contacts []Contact
	mu       sync.RWMutex
)

func main() {
	// Initialize Gin router
	r := gin.Default()

	// Serve static files
	r.Static("/static", "./static")
	r.Static("/assets", "./assets")

	// Load HTML templates
	r.LoadHTMLGlob("templates/*")

	// Profile data
	profile := Profile{
		Name:    "Maisarah",
		Title:   "Business Development Manager",
		Company: "OTA MY SDN BHD",
		Phone:   "016-4282828",
		Email:   "maisarah@otamy.net",
	}

	// Routes
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"profile": profile,
		})
	})

	// API routes
	r.POST("/api/contact/phone", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Phone contact initiated",
			"phone":   profile.Phone,
		})
	})

	r.POST("/api/contact/email", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Email contact initiated",
			"email":   profile.Email,
		})
	})

	// Add contact to server storage
	r.POST("/contact", func(c *gin.Context) {
		var newContact Contact
		if err := c.ShouldBindJSON(&newContact); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		mu.Lock()
		contacts = append(contacts, newContact)
		mu.Unlock()

		c.JSON(http.StatusOK, gin.H{
			"message": "Contact added successfully",
			"contact": newContact,
		})
	})

	// Get all contacts
	r.GET("/contacts", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(http.StatusOK, gin.H{
			"contacts": contacts,
			"count":    len(contacts),
		})
	})

	// Download contact as vCard
	r.GET("/download-contact", func(c *gin.Context) {
		vcard := `BEGIN:VCARD
	VERSION:3.0
	N:Maisarah;;;;
	FN:Maisarah
	ORG:OTA MY SDN BHD
	TITLE:Business Development Manager
	TEL;TYPE=CELL:016-4282828
	EMAIL:maisarah@otamy.net
	END:VCARD`
		c.Header("Content-Disposition", "attachment; filename=maisarah.vcf")
		c.Data(http.StatusOK, "text/vcard", []byte(vcard))
	})

	// Health check
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "business-profile",
		})
	})

	// Start server
	r.Run(":8080")
}
