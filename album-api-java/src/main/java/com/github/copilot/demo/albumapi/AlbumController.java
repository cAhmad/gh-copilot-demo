package com.github.copilot.demo.albumapi;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/albums")
public class AlbumController {
    
    private final AlbumRepository albumRepository;
    
    public AlbumController(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }
    
    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable int id) {
        return albumRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
