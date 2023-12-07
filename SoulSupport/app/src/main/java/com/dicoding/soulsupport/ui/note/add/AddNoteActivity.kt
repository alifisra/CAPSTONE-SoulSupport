package com.dicoding.soulsupport.ui.note.add

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.soulsupport.databinding.ActivityAddNoteBinding
import com.dicoding.soulsupport.ui.auth.register.RegisterActivity
import com.dicoding.soulsupport.ui.note.detail.DetailNoteActivity

class AddNoteActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAddNoteBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddNoteBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSimpan.setOnClickListener {
            val intent = Intent(this, DetailNoteActivity::class.java)
            startActivity(intent)
        }
    }
}