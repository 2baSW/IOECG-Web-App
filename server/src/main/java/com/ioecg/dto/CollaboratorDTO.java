package com.ioecg.dto;

public class CollaboratorDTO {
    public Long id;
    public Boolean admin;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Boolean getAdmin() {
        return admin;
    }
    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
