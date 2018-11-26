import {Component, OnInit} from '@angular/core';
import {Post} from "../../_models/Post";
import {PostService} from "../../../_services/post.service";
import swal from "sweetalert";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    readonly API = environment.api;

    posts: Post[];

    postInModal: Post;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.postService.getPosts().subscribe(res => {
            this.posts = res.data;
        })
    }

    remove(id, index) {
        let self = this;
        swal({
            title: 'Tem certeza disso?',
            text: 'Deseja mesmo remover esse produto?',
            icon: 'warning',
            buttons: [
                'Não, não quero deletar!',
                'Sim, quero deletar!'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                let deletePost = self.postService.destroy(id)
                    .subscribe(res => {
                        swal({
                            text: res.message,
                            icon: res.icon
                        });

                        self.posts.splice(index, 1);
                    }, err => {
                        swal({
                            text: err.message,
                            icon: 'warning'
                        })
                    }, () => {
                        deletePost.unsubscribe();
                    })
            }
        });
    }

    setPostInModal(index) {
        this.postInModal = this.posts[index];
    }

}
