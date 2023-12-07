package com.dicoding.soulsupport.ui.note.note

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.soulsupport.databinding.ActivityNoteBinding
import com.dicoding.soulsupport.ui.main.MainActivity
import com.dicoding.soulsupport.ui.note.add.AddNoteActivity
import com.dicoding.soulsupport.ui.note.detail.DetailNoteActivity

class NoteActivity : AppCompatActivity() {

     private lateinit var binding: ActivityNoteBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityNoteBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.extendedFab.setOnClickListener {
            val intent = Intent(this, AddNoteActivity::class.java)
            startActivity(intent)
        }

        onBack()
    }

    private fun onBack() {
        binding.btnBack.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
    }
}