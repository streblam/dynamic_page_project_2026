$(document).ready(function () {

  // Ja lietotājam sistēmā izslēgtas animācijas, jQuery efekti notiek uzreiz
  var mazākKustību = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (mazākKustību) {
    $.fx.off = true;
  }


  /* =========================================================
     DATI
     ========================================================= */
  var profesijas = [
    { nosaukums: 'Programmētājs', nozare: 'IT', dara: 'Raksta un uztur kodu lietotnēm, mājaslapām un sistēmām.', kur: 'Augstskola, kursi' },
    { nosaukums: 'Datu analītiķis', nozare: 'IT', dara: 'Apstrādā datus un atrod tajos sakarības, kas palīdz pieņemt lēmumus.', kur: 'Augstskola' },
    { nosaukums: 'Kiberdrošības speciālists', nozare: 'IT', dara: 'Aizsargā sistēmas un datus no uzbrukumiem un noplūdēm.', kur: 'Augstskola, kursi' },
    { nosaukums: 'UX dizainers', nozare: 'IT', dara: 'Pēta lietotāju vajadzības un projektē ērtas digitālās saskarnes.', kur: 'Augstskola, kursi' },
    { nosaukums: 'Grafiskais dizainers', nozare: 'Radošās', dara: 'Veido zīmolu vizuālo identitāti, maketus un ilustrācijas.', kur: 'Koledža, augstskola' },
    { nosaukums: 'Video operators', nozare: 'Radošās', dara: 'Filmē un montē video reklāmām, televīzijai un internetam.', kur: 'Koledža, kursi' },
    { nosaukums: 'Arhitekts', nozare: 'Radošās', dara: 'Projektē ēkas un telpas, apvienojot funkcionalitāti un estētiku.', kur: 'Augstskola' },
    { nosaukums: 'Ārsts', nozare: 'Veselība', dara: 'Diagnosticē un ārstē slimības, konsultē pacientus.', kur: 'Augstskola' },
    { nosaukums: 'Medicīnas māsa', nozare: 'Veselība', dara: 'Aprūpē pacientus un veic medicīniskās procedūras.', kur: 'Koledža, augstskola' },
    { nosaukums: 'Fizioterapeits', nozare: 'Veselība', dara: 'Palīdz atjaunot kustību spējas pēc traumām un slimībām.', kur: 'Augstskola' },
    { nosaukums: 'Būvinženieris', nozare: 'Tehnika', dara: 'Aprēķina un projektē konstrukcijas: ēkas, tiltus un ceļus.', kur: 'Augstskola' },
    { nosaukums: 'Elektriķis', nozare: 'Tehnika', dara: 'Ierīko un remontē elektroinstalācijas un iekārtas.', kur: 'Profesionālā izglītība' },
    { nosaukums: 'Automehāniķis', nozare: 'Tehnika', dara: 'Diagnosticē un remontē transportlīdzekļus.', kur: 'Profesionālā izglītība' },
    { nosaukums: 'Metinātājs', nozare: 'Tehnika', dara: 'Savieno metāla detaļas būvniecībā un ražošanā.', kur: 'Profesionālā izglītība, kursi' },
    { nosaukums: 'Skolotājs', nozare: 'Sabiedrība', dara: 'Māca un atbalsta skolēnus mācību procesā.', kur: 'Augstskola' },
    { nosaukums: 'Psihologs', nozare: 'Sabiedrība', dara: 'Pēta cilvēka uzvedību un sniedz psiholoģisku atbalstu.', kur: 'Augstskola' },
    { nosaukums: 'Žurnālists', nozare: 'Sabiedrība', dara: 'Vāc informāciju un veido ziņas, rakstus un raidījumus.', kur: 'Augstskola' },
    { nosaukums: 'Vides zinātnieks', nozare: 'Daba', dara: 'Pēta vides procesus un meklē veidus, kā mazināt piesārņojumu.', kur: 'Augstskola' },
    { nosaukums: 'Mežsaimnieks', nozare: 'Daba', dara: 'Plāno meža apsaimniekošanu, atjaunošanu un aizsardzību.', kur: 'Koledža, augstskola' },
    { nosaukums: 'Agronoms', nozare: 'Daba', dara: 'Konsultē par augu audzēšanu, augsni un ražas kvalitāti.', kur: 'Augstskola, koledža' }
  ];

  var izglītība = [
    {
      virsraksts: 'Augstskola',
      apraksts: 'Bakalaura, maģistra un doktora studiju programmas. Teorētiskās zināšanas tiek apvienotas ar pētniecību un praksi.',
      ilgums: 'Bakalaura studijas parasti 3–4 gadi',
      rezultāts: 'Bakalaura vai maģistra grāds, profesionālā kvalifikācija',
      piemērots: 'Profesijām, kurās nepieciešams grāds, piemēram, ārstiem, skolotājiem un inženieriem'
    },
    {
      virsraksts: 'Koledža',
      apraksts: 'Pirmā līmeņa profesionālā augstākā izglītība ar lielu prakses daļu. Pēc koledžas studijas var turpināt augstskolā.',
      ilgums: 'Parasti 2–3 gadi',
      rezultāts: 'Pirmā līmeņa profesionālās augstākās izglītības diploms',
      piemērots: 'Praktiskām profesijām, kurās svarīga ātra iekļaušanās darbā'
    },
    {
      virsraksts: 'Profesionālā izglītība',
      apraksts: 'Tehnikumi un profesionālās izglītības kompetences centri māca konkrētu arodu. Liela daļa mācību notiek darbnīcās un uzņēmumos.',
      ilgums: 'Parasti 4 gadi pēc pamatskolas vai 1–1,5 gadi pēc vidusskolas',
      rezultāts: 'Profesionālā kvalifikācija, pēc pamatskolas arī vidējā izglītība',
      piemērots: 'Arodiem tehnikā, būvniecībā, ēdināšanā un skaistumkopšanā'
    },
    {
      virsraksts: 'Kursi un pašmācība',
      apraksts: 'Tiešsaistes kursi, mācību centri, mentoru programmas un pašmācība. Elastīgs veids, kā apgūt jaunu prasmi vai mainīt jomu.',
      ilgums: 'No dažām nedēļām līdz vairākiem mēnešiem',
      rezultāts: 'Sertifikāts vai praktisku darbu portfolio',
      piemērots: 'Prasmju papildināšanai un karjeras maiņai, īpaši IT un radošajās nozarēs'
    }
  ];


  /* =========================================================
     1. EFEKTS: fadeTo() + delay()
     Ielādējot lapu, hero elementi parādās viens pēc otra
     ========================================================= */
  $('.ielade').each(function (i) {
    $(this).delay(150 + i * 250).fadeTo(700, 1);
  });


  /* =========================================================
     2. EFEKTS: teksta "sajaukšana" ar .text()
     Burti īsi pārvēršas nejaušos simbolos un tad nostājas vietā.
     Notiek, kad tablo parādās jauna rinda vai uz tās uzbrauc ar peli.
     ========================================================= */
  var simboli = 'abcdefghijklmnoprstuvz0123456789';

  function sajaukt($el) {
    if (mazākKustību || $el.data('notiek')) return;

    var gala = $el.data('teksts') || $el.text();
    $el.data('teksts', gala).data('notiek', true);

    var solis = 0;
    var taimeris = setInterval(function () {
      var rezultāts = '';
      for (var i = 0; i < gala.length; i++) {
        if (gala[i] === ' ' || i < solis / 2) {
          rezultāts += gala[i];
        } else {
          rezultāts += simboli[Math.floor(Math.random() * simboli.length)];
        }
      }
      $el.text(rezultāts);
      solis++;

      if (solis / 2 >= gala.length) {
        clearInterval(taimeris);
        $el.text(gala).data('notiek', false);
      }
    }, 28);
  }


  /* =========================================================
     3. EFEKTS: slideUp() + append()
     Tablo rindas ritinās kā lidostas izlidošanas tablo.
     Uzbraucot ar peli, ritināšana apstājas.
     ========================================================= */
  var tabloNr = 0;
  var tabloPauze = false;

  function tabloRinda(p) {
    var $rinda = $('<li class="tablo-rinda"></li>');
    $('<span class="tablo-nosaukums"></span>').text(p.nosaukums).appendTo($rinda);
    $('<span class="tablo-nozare"></span>').text(p.nozare).appendTo($rinda);
    // Tablo vietas mazāk, tāpēc garo nosaukumu saīsinām
    var kur = p.kur.split(',')[0].replace('Profesionālā izglītība', 'Tehnikums');
    $('<span class="tablo-cels"></span>').text(kur).appendTo($rinda);
    return $rinda;
  }

  // Sākumā 5 rindas
  for (var i = 0; i < 5; i++) {
    $('#tablo-rindas').append(tabloRinda(profesijas[tabloNr]));
    tabloNr = (tabloNr + 3) % profesijas.length; // ar soli 3, lai nozares mijas
  }

  setInterval(function () {
    if (tabloPauze || mazākKustību) return;

    var $jauna = tabloRinda(profesijas[tabloNr]);
    tabloNr = (tabloNr + 3) % profesijas.length;
    $('#tablo-rindas').append($jauna);
    sajaukt($jauna.find('.tablo-nosaukums'));

    $('#tablo-rindas li').first().slideUp(500, function () {
      $(this).remove();
    });
  }, 2800);

  $('.tablo')
    .on('mouseenter', function () { tabloPauze = true; })
    .on('mouseleave', function () { tabloPauze = false; });

  $('#tablo-rindas').on('mouseenter', '.tablo-rinda', function () {
    sajaukt($(this).find('.tablo-nosaukums'));
  });


  /* =========================================================
     4. EFEKTS: meklēšana un filtrs ar fadeIn() / hide()
     Profesiju sarakstu var atlasīt pēc nozares un meklēt pēc vārda
     ========================================================= */
  // Noņem garumzīmes, lai "arsts" atrastu arī "Ārsts"
  function vienkāršot(teksts) {
    return teksts.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  $.each(profesijas, function (i, p) {
    var $rinda = $('<div class="tabula-rinda" role="row"></div>')
      .attr('data-nozare', p.nozare)
      .attr('data-meklet', vienkāršot(p.nosaukums + ' ' + p.dara + ' ' + p.nozare));

    var $nosaukums = $('<span class="nosaukums" role="cell"></span>').text(p.nosaukums);
    $('<small></small>').text(p.nozare).appendTo($nosaukums);

    $rinda.append($nosaukums);
    $('<span class="apraksts" role="cell"></span>').text(p.dara).appendTo($rinda);
    $('<span class="kur" role="cell"></span>').text(p.kur).appendTo($rinda);
    $('#profesiju-saraksts').append($rinda);
  });

  var izvēlētāNozare = 'visas';

  function filtrēt() {
    var vaicājums = vienkāršot($.trim($('#meklet').val()));
    var redzamas = 0;

    $('.tabula-rinda').each(function () {
      var $r = $(this);
      var derNozare = izvēlētāNozare === 'visas' || $r.data('nozare') === izvēlētāNozare;
      var derTeksts = vaicājums === '' || $r.data('meklet').indexOf(vaicājums) !== -1;

      if (derNozare && derTeksts) {
        redzamas++;
        if (!$r.is(':visible')) $r.stop(true, true).fadeIn(250);
      } else {
        $r.stop(true, true).hide();
      }
    });

    $('#skaits').text('Rāda ' + redzamas + ' no ' + profesijas.length + ' profesijām');

    if (redzamas === 0) {
      $('#nav-rezultatu').stop(true, true).fadeIn(200);
    } else {
      $('#nav-rezultatu').hide();
    }
  }

  $('.nozare').on('click', function () {
    izvēlētāNozare = $(this).data('nozare');
    $('.nozare').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
    filtrēt();
  });

  $('#meklet').on('input', filtrēt);

  filtrēt();


  /* =========================================================
     5. EFEKTS: slideDown() / slideUp()
     Prasmju akordeons – atvērta viena prasme vienlaikus
     ========================================================= */
  $('.prasme-galva').on('click', function () {
    var $poga = $(this);
    var atvērta = $poga.attr('aria-expanded') === 'true';

    $('.prasme-galva').not($poga).attr('aria-expanded', 'false')
      .next('.prasme-saturs').stop(true, true).slideUp(250);

    $poga.attr('aria-expanded', atvērta ? 'false' : 'true');
    $poga.next('.prasme-saturs').stop(true, true)[atvērta ? 'slideUp' : 'slideDown'](300);
  });


  /* =========================================================
     6. EFEKTS: animate() ar left un width + fadeOut() / fadeIn()
     Cilnes: svītra aizslīd zem izvēlētās cilnes, saturs nomainās
     ========================================================= */
  function pārvietotIndikatoru(ātri) {
    var $aktīvā = $('.cilne.aktiva');
    $('.cilnes-indikators').stop().animate({
      left: $aktīvā.position().left + $('.cilnes').scrollLeft(),
      width: $aktīvā.outerWidth()
    }, ātri ? 0 : 300);
  }

  function ielikt(nr) {
    var d = izglītība[nr];
    $('#panelis-virsraksts').text(d.virsraksts);
    $('#panelis-apraksts').text(d.apraksts);
    $('#fakts-ilgums').text(d.ilgums);
    $('#fakts-rezultats').text(d.rezultāts);
    $('#fakts-piemerots').text(d.piemērots);
  }

  function rādītCilni(nr) {
    $('.cilne').removeClass('aktiva').attr('aria-selected', 'false');
    $('.cilne').eq(nr).addClass('aktiva').attr('aria-selected', 'true');
    pārvietotIndikatoru(false);

    $('#cilnes-panelis').stop(true, true).fadeOut(150, function () {
      ielikt(nr);
      $(this).fadeIn(250); // jQuery atceras sākotnējo display: grid
    });
  }

  $('.cilne').on('click', function () {
    rādītCilni($(this).data('cilne'));
  });

  // Ar bultiņām var pārslēgt cilnes
  $('.cilne').on('keydown', function (e) {
    var nr = $(this).data('cilne');
    if (e.key === 'ArrowRight') nr = (nr + 1) % izglītība.length;
    else if (e.key === 'ArrowLeft') nr = (nr - 1 + izglītība.length) % izglītība.length;
    else return;
    e.preventDefault();
    rādītCilni(nr);
    $('.cilne').eq(nr).trigger('focus');
  });

  ielikt(0);
  pārvietotIndikatoru(true);
  $(window).on('resize', function () { pārvietotIndikatoru(true); });
  // Kad fonti ielādējušies, cilņu platums var mainīties
  if (document.fonts) document.fonts.ready.then(function () { pārvietotIndikatoru(true); });


  /* =========================================================
     7. EFEKTS: fadeOut() + fadeIn() ar teksta maiņu
     Mīta kartīte pārvēršas par faktu un atpakaļ
     ========================================================= */
  $('.mits').on('click', function () {
    var $k = $(this);
    var rāda = $k.attr('aria-pressed') === 'true';
    var $teksts = $k.find('.mits-teksts');

    $teksts.stop(true, true).fadeOut(150, function () {
      $k.attr('aria-pressed', rāda ? 'false' : 'true');
      $k.find('.mits-birka').text(rāda ? 'Mīts' : 'Fakts');
      $teksts.text(rāda ? $k.data('mits') : $k.data('fakts')).fadeIn(250);
    });
  });


  /* =========================================================
     8. EFEKTS: ritināšana – .css(), toggleClass() un animate({scrollTop})
     Lasīšanas progresa josla, galvenes ēna un gluda ritināšana
     ========================================================= */
  $(window).on('scroll', function () {
    var ritinājums = $(this).scrollTop();
    var augstums = $(document).height() - $(this).height();

    $('.progress-josla').css('width', (ritinājums / augstums * 100) + '%');
    $('#galvene').toggleClass('ar-enu', ritinājums > 10);
  }).trigger('scroll');

  $('a[href^="#"]').on('click', function (e) {
    var $mērķis = $(this.hash);
    if (!$mērķis.length) return;
    e.preventDefault();

    $('html, body').stop().animate({
      scrollTop: Math.max(0, $mērķis.offset().top - 72)
    }, 650, function () {
      $mērķis.attr('tabindex', '-1').trigger('focus');
    });
  });

});
