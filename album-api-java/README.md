# Album API - Java Spring Boot

A modern RESTful API built with Spring Boot 4.0 and Java 25 to manage a collection of albums.

## Features

- RESTful API endpoints for album management
- In-memory data storage
- Clean architecture with Repository pattern
- Record-based DTOs for immutability
- Comprehensive test coverage with AssertJ
- CORS enabled for frontend integration

## Technology Stack

- **Java 25**
- **Spring Boot 4.0.0**
- **Maven** for dependency management
- **AssertJ** for fluent assertions in tests

## API Endpoints

### Get All Albums
```
GET http://localhost:3000/albums
```

Returns a list of all albums.

**Response:**
```json
[
  {
    "id": 1,
    "title": "You, Me and an App Id",
    "artist": "Daprize",
    "price": 10.99,
    "imageUrl": "https://aka.ms/albums-daprlogo"
  }
]
```

### Get Album by ID
```
GET http://localhost:3000/albums/{id}
```

Returns a specific album by ID.

**Response:**
- `200 OK` with album data if found
- `404 Not Found` if album doesn't exist

## Getting Started

### Prerequisites

- Java 25 or higher
- Maven 3.6 or higher

### Running the Application

1. Navigate to the project directory:
```bash
cd album-api-java
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:3000`

### Running Tests

Run all tests:
```bash
mvn test
```

Run with coverage:
```bash
mvn clean verify
```

## Project Structure

```
album-api-java/
├── src/
│   ├── main/
│   │   ├── java/com/github/copilot/demo/albumapi/
│   │   │   ├── Album.java              # Album record DTO
│   │   │   ├── AlbumRepository.java    # Data access layer
│   │   │   ├── AlbumController.java    # REST controller
│   │   │   └── AlbumApiApplication.java # Spring Boot application
│   │   └── resources/
│   │       └── application.properties   # Application configuration
│   └── test/
│       └── java/com/github/copilot/demo/albumapi/
│           ├── AlbumControllerTest.java           # Unit tests
│           ├── AlbumControllerIntegrationTest.java # Integration tests
│           └── AlbumRepositoryTest.java           # Repository tests
└── pom.xml
```

## Design Principles

This implementation follows modern Java and Spring Boot best practices:

- **KISS (Keep It Simple, Stupid)**: Clean and straightforward implementation
- **YAGNI (You Aren't Gonna Need It)**: Only implements required features
- **SOLID Principles**: Single responsibility, dependency injection
- **DRY (Don't Repeat Yourself)**: Reusable components and comprehensive test cases
- **Record DTOs**: Immutable data transfer objects using Java records
- **Repository Pattern**: Separation of data access logic

## Testing

The application includes comprehensive tests using AssertJ for fluent assertions:

- **Unit Tests**: Test individual components in isolation with mocking
- **Integration Tests**: Test the full application stack with a running server
- **Repository Tests**: Validate data access layer functionality

All tests follow the AAA (Arrange-Act-Assert) pattern for clarity.
