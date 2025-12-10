package com.github.copilot.demo.albumapi;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class AlbumRepository {
    
    private static final List<Album> ALBUMS = List.of(
        new Album(1, "You, Me and an App Id", "Daprize", 10.99, "https://aka.ms/albums-daprlogo"),
        new Album(2, "Seven Revision Army", "The Blue-Green Stripes", 13.99, "https://aka.ms/albums-containerappslogo"),
        new Album(3, "Scale It Up", "KEDA Club", 13.99, "https://aka.ms/albums-kedalogo"),
        new Album(4, "Lost in Translation", "MegaDNS", 12.99, "https://aka.ms/albums-envoylogo"),
        new Album(5, "Lock Down Your Love", "V is for VNET", 12.99, "https://aka.ms/albums-vnetlogo"),
        new Album(6, "Sweet Container O' Mine", "Guns N Probeses", 14.99, "https://aka.ms/albums-containerappslogo")
    );
    
    public List<Album> findAll() {
        return ALBUMS;
    }
    
    public Optional<Album> findById(int id) {
        return ALBUMS.stream()
            .filter(album -> album.id() == id)
            .findFirst();
    }
}
