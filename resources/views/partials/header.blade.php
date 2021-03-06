<header class="banner">
  <div class="container">
    <a class="brand" href="{{ home_url('/') }}"><img class="logo-header" title="{{ get_bloginfo('name', 'display') }}" src="@asset('images/eU-maps_logo.png')"></a>
    <nav class="nav-primary navbar navbar-expand-lg">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'walker' => new \App\wp_bootstrap4_navwalker() , 'menu_class' => 'nav navbar-nav mr-auto']) !!}
      @endif
      <span class="navbar-text">
	     <button class="hamburger hamburger--spin shiftnav-toggle shiftnav-toggle-button" data-shiftnav-target="menu_right"" type="button">
		  <span class="hamburger-box">
		    <span class="hamburger-inner"></span>
		  </span>
		</button>
      </span>
    </nav>
    
  </div>
</header>
