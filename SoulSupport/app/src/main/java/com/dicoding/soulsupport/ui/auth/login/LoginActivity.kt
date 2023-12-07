package com.dicoding.soulsupport.ui.auth.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.soulsupport.R
import com.dicoding.soulsupport.databinding.ActivityLoginBinding
import com.dicoding.soulsupport.ui.auth.register.RegisterActivity
import com.dicoding.soulsupport.ui.main.MainActivity
import java.lang.Exception

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.linkSignup.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        loginAction()
    }

    private fun loginAction() {
        binding.btnLoginMasuk.setOnClickListener {
            val email = binding.edLoginEmail.text.toString()
            val password = binding.edLoginPassword.text.toString()

            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            //
        }
    }
}