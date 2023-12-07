package com.dicoding.soulsupport.ui.auth.register

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.soulsupport.R
import com.dicoding.soulsupport.databinding.ActivityRegisterBinding
import com.dicoding.soulsupport.ui.auth.login.LoginActivity
import com.dicoding.soulsupport.ui.main.MainActivity

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.linkLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        registerAction()
    }

    private fun registerAction() {
        binding.btnRsDaftar.setOnClickListener {
            val username = binding.edRegisterUsername.text.toString()
            val email = binding.edRegisterEmail.text.toString()
            val password = binding.edRegisterPassword.text.toString()

            // test
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
    }
}