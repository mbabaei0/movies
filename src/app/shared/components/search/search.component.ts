import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, input, output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  debounce = input<number>(300);
  searchChanged = output<string>();
  searchInput$ = new Subject<string>();

  ngOnInit(): void {
    this.searchInput$
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(this.debounce())
    )
    .subscribe((searchTerm: string) => {
      this.searchChanged.emit(searchTerm)
    });
  }

  onSearchInputChange(searchTerm: string) {
    this.searchInput$.next(searchTerm.trim());
  }

}
