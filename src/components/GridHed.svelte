<script>
    // color rotation
</script>

<div class='grid-container'>
    <div class='the'>The</div>

        <div class='n1 large'>N</div>
        <div class='a2 large'>A</div>
        <div class='k3 large'>K</div>
        <div class='e4 large'>E</div>
        <div class='d5 large'>D</div>


        <div class='t6 large'>T</div>
        <div class='r7 large'>R</div>
        <div class='u8 large'>U</div>
        <div class='t9 large'>T</div>
        <div class='h10 large'>H</div>

    <div class='meta'>
        <div class='meta-by'>
            <!-- byline information -->
            <time>March 2021</time>
        </div>
        <div class='dek'></div>
    </div>

    <div class="border1"></div>
    <div class="border2"></div>
</div>


<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 10% 1fr 1fr 1fr;
  gap: 0px 0px;
}
.the { grid-area: 1 / 1 / 2 / 2; }
.dek { grid-area: 4 / 4 / 5 / 5; }
.n1 { grid-area: 2 / 1 / 3 / 2; }
.a2 { grid-area: 2 / 2 / 3 / 3; }
.k3 { grid-area: 2 / 3 / 3 / 4; }
.e4 { grid-area: 2 / 4 / 3 / 5; }
.d5 { grid-area: 2 / 5 / 3 / 6; }
.t6 { grid-area: 3 / 1 / 4 / 2; }
.r7 { grid-area: 3 / 2 / 4 / 3; }
.u8 { grid-area: 3 / 3 / 4 / 4; }
.t9 { grid-area: 3 / 4 / 4 / 5; }
.h10 { grid-area: 3 / 5 / 4 / 6; }
.meta { grid-area: 4 / 2 / 5 / 3; }
.border1 { 
    grid-area: 1 / 2 / 5 / 3; 
    border-left: 1px solid var(--gray);
    border-right: 1px solid var(--gray);
    }
.border2 { grid-area: 1 / 4 / 5 / 5; 
    border-left: 1px solid var(--gray);
    border-right: 1px solid var(--gray);
    }
    
  .large {
      font-size: 10em;
      text-align: center;
  }

</style>
