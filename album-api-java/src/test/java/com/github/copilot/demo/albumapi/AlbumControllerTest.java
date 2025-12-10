package com.github.copilot.demo.albumapi;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AlbumControllerTest {
    
    @Mock
    private AlbumRepository albumRepository;
    
    @InjectMocks
    private AlbumController albumController;
    
    @Test
    void shouldReturnAllAlbumsFromRepository() {
        // Given
        List<Album> expectedAlbums = List.of(
            new Album(1, "Test Album 1", "Artist 1", 9.99, "url1"),
            new Album(2, "Test Album 2", "Artist 2", 12.99, "url2")
        );
        when(albumRepository.findAll()).thenReturn(expectedAlbums);
        
        // When
        List<Album> actualAlbums = albumController.getAllAlbums();
        
        // Then
        assertThat(actualAlbums)
            .isNotNull()
            .hasSize(2)
            .containsExactlyElementsOf(expectedAlbums);
    }
    
    @Test
    void shouldReturnAlbumWhenFound() {
        // Given
        Album expectedAlbum = new Album(1, "Test Album", "Test Artist", 15.99, "test-url");
        when(albumRepository.findById(1)).thenReturn(Optional.of(expectedAlbum));
        
        // When
        ResponseEntity<Album> response = albumController.getAlbumById(1);
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedAlbum);
    }
    
    @Test
    void shouldReturnNotFoundWhenAlbumDoesNotExist() {
        // Given
        when(albumRepository.findById(999)).thenReturn(Optional.empty());
        
        // When
        ResponseEntity<Album> response = albumController.getAlbumById(999);
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isNull();
    }
}
