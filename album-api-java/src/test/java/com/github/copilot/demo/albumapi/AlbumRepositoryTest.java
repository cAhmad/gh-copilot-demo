package com.github.copilot.demo.albumapi;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class AlbumRepositoryTest {
    
    private final AlbumRepository albumRepository = new AlbumRepository();
    
    @Test
    void shouldReturnAllSixAlbums() {
        // When
        List<Album> albums = albumRepository.findAll();
        
        // Then
        assertThat(albums)
            .isNotNull()
            .hasSize(6)
            .extracting(Album::id)
            .containsExactly(1, 2, 3, 4, 5, 6);
    }
    
    @Test
    void shouldReturnAlbumWhenIdExists() {
        // When
        Optional<Album> album = albumRepository.findById(1);
        
        // Then
        assertThat(album)
            .isPresent()
            .get()
            .satisfies(a -> {
                assertThat(a.id()).isEqualTo(1);
                assertThat(a.title()).isEqualTo("You, Me and an App Id");
                assertThat(a.artist()).isEqualTo("Daprize");
                assertThat(a.price()).isEqualTo(10.99);
                assertThat(a.imageUrl()).isEqualTo("https://aka.ms/albums-daprlogo");
            });
    }
    
    @Test
    void shouldReturnEmptyWhenIdDoesNotExist() {
        // When
        Optional<Album> album = albumRepository.findById(999);
        
        // Then
        assertThat(album).isEmpty();
    }
    
    @Test
    void shouldReturnAllAlbumsWithCorrectData() {
        // When
        List<Album> albums = albumRepository.findAll();
        
        // Then
        assertThat(albums)
            .extracting(Album::title)
            .containsExactly(
                "You, Me and an App Id",
                "Seven Revision Army",
                "Scale It Up",
                "Lost in Translation",
                "Lock Down Your Love",
                "Sweet Container O' Mine"
            );
        
        assertThat(albums)
            .extracting(Album::price)
            .allMatch(price -> price > 0);
        
        assertThat(albums)
            .extracting(Album::imageUrl)
            .allMatch(url -> url.startsWith("https://"));
    }
}
