package com.github.copilot.demo.albumapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AlbumControllerIntegrationTest {
    
    @LocalServerPort
    private int port;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldReturnAllAlbums() {
        // When
        ResponseEntity<Album[]> response = restTemplate.getForEntity(
            "http://localhost:" + port + "/albums",
            Album[].class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(6);
        
        Album firstAlbum = response.getBody()[0];
        assertThat(firstAlbum.id()).isEqualTo(1);
        assertThat(firstAlbum.title()).isEqualTo("You, Me and an App Id");
        assertThat(firstAlbum.artist()).isEqualTo("Daprize");
        assertThat(firstAlbum.price()).isEqualTo(10.99);
        assertThat(firstAlbum.imageUrl()).isEqualTo("https://aka.ms/albums-daprlogo");
    }
    
    @Test
    void shouldReturnAlbumById() {
        // When
        ResponseEntity<Album> response = restTemplate.getForEntity(
            "http://localhost:" + port + "/albums/1",
            Album.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().id()).isEqualTo(1);
        assertThat(response.getBody().title()).isEqualTo("You, Me and an App Id");
        assertThat(response.getBody().artist()).isEqualTo("Daprize");
    }
    
    @Test
    void shouldReturnNotFoundForNonExistentAlbum() {
        // When
        ResponseEntity<Album> response = restTemplate.getForEntity(
            "http://localhost:" + port + "/albums/999",
            Album.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
    
    @Test
    void shouldReturnCorrectAlbumData() {
        // When
        ResponseEntity<Album[]> response = restTemplate.getForEntity(
            "http://localhost:" + port + "/albums",
            Album[].class
        );
        
        // Then
        assertThat(response.getBody())
            .isNotNull()
            .extracting(Album::title)
            .containsExactly(
                "You, Me and an App Id",
                "Seven Revision Army",
                "Scale It Up",
                "Lost in Translation",
                "Lock Down Your Love",
                "Sweet Container O' Mine"
            );
        
        assertThat(response.getBody())
            .extracting(Album::artist)
            .containsExactly(
                "Daprize",
                "The Blue-Green Stripes",
                "KEDA Club",
                "MegaDNS",
                "V is for VNET",
                "Guns N Probeses"
            );
    }
}
