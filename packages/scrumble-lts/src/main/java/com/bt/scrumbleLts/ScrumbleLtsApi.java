package com.bt.scrumbleLts;

import com.blade.Blade;

public class ScrumbleLtsApi {
    public static void main(String[] args) {
        Blade.of().get("/", ctx -> ctx.text("Hello Blade")).start();
    }
}
