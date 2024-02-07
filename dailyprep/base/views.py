from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from .models import Task
from .forms import UploadFeatures

class UserLoginView(LoginView):
    template_name = "base/login.html"
    fields = "__all__"
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse_lazy("tasks")

class UserRegisterView(FormView):
    template_name = "base/register.html"
    form_class = UserCreationForm
    success_url = reverse_lazy("tasks")

    def form_valid(self, form):
        user = form.save()
        if user is not None:
            login(self.request, user)
        return super(UserRegisterView, self).form_valid(form)
    
    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect("tasks")
        return super(UserRegisterView, self).get(*args, **kwargs)

#looks for task_list.html
class TaskList(ListView):
    model = Task
    context_object_name = "tasks"   #changes object list name
#change template name to index.html / change html

    #gets todos of only logged in user
    def get_context_data(self, **kwargs):
        if self.request.user.is_authenticated:
            context = super().get_context_data(**kwargs)
            #filters by user
            context["tasks"] = context["tasks"].filter(user=self.request.user)
            #filters already user filtered data into non complete
            context["count"] = context["tasks"].filter(complete=False).count()
            return context
        else:
            pass

#looks for task_detail.html
class TaskDetail(DetailView):
    model = Task
    context_object_name = "task"
    template_name = "base/task.html"

class TaskCreate(CreateView):
    model = Task
    fields = {"body", "important", "complete"}
    #when a user creates a new item, send user back to list
    success_url = reverse_lazy("tasks")

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(TaskCreate, self).form_valid(form)


class TaskUpdate(UpdateView):
    model = Task
    fields = {"body", "important", "complete"}
    success_url = reverse_lazy("tasks")

#DeleteView looks for task_confirm_delete.html
class TaskDelete(DeleteView):
    model = Task
    context_object_name = "task"
    success_url = reverse_lazy("tasks")

def features(request):
    form = UploadFeatures(request.POST)
    return render(request, "base/features.html", {"form": form})