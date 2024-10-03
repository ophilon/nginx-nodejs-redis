function fish_prompt
    set_color green
    echo -n (whoami)
    set_color normal
    echo -n ":"
    set_color blue
    echo -n (pwd)
    set_color normal
    echo -n "> "
end
