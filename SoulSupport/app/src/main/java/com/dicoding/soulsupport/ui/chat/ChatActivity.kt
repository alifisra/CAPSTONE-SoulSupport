package com.dicoding.soulsupport.ui.chat

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.soulsupport.R
import com.dicoding.soulsupport.databinding.ActivityChatBinding
import com.dicoding.soulsupport.ui.main.MainActivity
import com.dicoding.soulsupport.ui.note.add.AddNoteActivity

class ChatActivity : AppCompatActivity() {

    private lateinit var binding: ActivityChatBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityChatBinding.inflate(layoutInflater)
        setContentView(binding.root)

        onBack()
    }

    private fun onBack() {
        binding.btnBack.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
    }
}