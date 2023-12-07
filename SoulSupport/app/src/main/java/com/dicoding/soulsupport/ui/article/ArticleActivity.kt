package com.dicoding.soulsupport.ui.article

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.dicoding.soulsupport.R
import com.dicoding.soulsupport.databinding.ActivityArticleBinding
import com.dicoding.soulsupport.ui.main.MainActivity
import com.dicoding.soulsupport.ui.note.add.AddNoteActivity

class ArticleActivity : AppCompatActivity() {

    private lateinit var binding: ActivityArticleBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityArticleBinding.inflate(layoutInflater)
        setContentView(binding.root)


        with(binding) {
            searchView.setupWithSearchBar(searchBar)
            searchView.editText.setOnEditorActionListener { _, _, _ ->
                Toast.makeText(this@ArticleActivity, " berhasil", Toast.LENGTH_SHORT).show()
                false
            }
        }

    }


}