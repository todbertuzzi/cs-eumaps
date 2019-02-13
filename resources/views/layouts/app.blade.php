<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>

    @php do_action('get_header') @endphp
    @include('partials.header')
    <!-- Modal -->
    <div class="modal fade" id="modal-partner" tabindex="-1" role="dialog" aria-labelledby="modal-partner" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Diventa Partner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <?php the_field('pop_up_partner', 'option'); ?>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal-eumaps" tabindex="-1" role="dialog" aria-labelledby="modal-partner" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modello eU-maps</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           <?php the_field('pop_up_eumaps', 'option'); ?>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap container-fluid" role="document" id="wrapper">
      <div class="content">
        <main class="main">
          @yield('content')
        </main>
        @if (App\display_sidebar())
          <aside class="sidebar">
            @include('partials.sidebar')
          </aside>
        @endif
      </div>
    </div>
    @php do_action('get_footer') @endphp
    @include('partials.footer')
    @php wp_footer() @endphp
  </body>
</html>
