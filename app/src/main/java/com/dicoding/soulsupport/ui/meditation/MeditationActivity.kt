package com.dicoding.soulsupport.ui.meditation

import android.media.MediaPlayer
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.dicoding.soulsupport.R
import com.dicoding.soulsupport.databinding.ActivityMeditationBinding

class MeditationActivity : AppCompatActivity() {

    private var player: MediaPlayer? = null
    private lateinit var binding: ActivityMeditationBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMeditationBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    fun play(v: View) {
        if (player == null) {
            player = MediaPlayer.create(this, R.raw.peaceful)
            player?.setOnCompletionListener {
                stopPlayer()
            }
        }

        player?.start()
    }

    fun pause(v: View) {
        player?.pause()
    }

    fun stop(v: View) {
        stopPlayer()
    }

    private fun stopPlayer() {
        player?.release()
        player = null
        Toast.makeText(this, "MediaPlayer released", Toast.LENGTH_SHORT).show()
    }

    override fun onStop() {
        super.onStop()
        stopPlayer()
    }
}