package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "admin")
@JsonInclude(value = Include.NON_DEFAULT)
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private int id;

	@Column(length = 45)
	@JsonProperty("name")
	private String name;

	@Column(length = 70)
	@JsonProperty("email")
	private String email;

	@Column(length = 50)
	@JsonProperty("password")
	private String password;

	/*
	 * ============================================
	 * Constructor============================================
	 */
	public Admin() {
		super();
	}

	public Admin(int id, String name, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	/*
	 * ============================================ Getters & Setters
	 * ============================================
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/*
	 * ============================================toString=========================
	 * ===================
	 */
	@Override
	public String toString() {
		return "Admin [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}

}
